'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn-merge'
import { ISLAND_PATH, MPA_CENTER } from '../data/geo'
import 'leaflet/dist/leaflet.css'

/**
 * Presentational map. Leaflet-based satellite view where zoom is driven by the progress state.
 * When zoomed out (progress <= 0.5), it displays Samar Island. When zoomed in (progress > 0.5),
 * it zooms to the Bagonbanua MPA outline overlay with an inset map showing its relative location.
 */
export default function MpaMap({
  progress,
  onToggle,
  className,
}: {
  progress: number
  onToggle: () => void
  className?: string
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)
  const polygonRef = useRef<import('leaflet').GeoJSON | null>(null)
  const markerRef = useRef<import('leaflet').Marker | null>(null)
  const [LState, setLState] = useState<typeof import('leaflet') | null>(null)
  const [geoJsonData, setGeoJsonData] = useState<unknown>(null)

  // Helper function to update Leaflet polygon opacity using CSS properties for smooth transition
  const updatePolygonOpacity = (isZoomed: boolean) => {
    if (!polygonRef.current) return
    polygonRef.current.eachLayer((layer) => {
      const pathLayer = layer as import('leaflet').Path
      const path = pathLayer.getElement?.() as SVGElement | undefined
      if (path) {
        path.style.transition = 'opacity 0.8s ease-in-out'
        path.style.opacity = isZoomed ? '1' : '0'
        path.style.fillOpacity = '0' // Ensure there is never a fill shade
      }
    })
  }

  // 1. Fetch geojson for Bagonbanua MPA
  useEffect(() => {
    fetch('/mpa/bagonbanua.geojson')
      .then((r) => r.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error('Failed to load geojson:', err))
  }, [])

  // 2. Dynamically load Leaflet on the client side to avoid SSR errors
  useEffect(() => {
    if (typeof window === 'undefined') return
    import('leaflet').then((leafletModule) => {
      setLState(leafletModule.default)
    })
  }, [])

  // 3. Initialize Leaflet Map
  useEffect(() => {
    if (!LState || !mapContainerRef.current || mapRef.current) return

    const L = LState

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      dragging: progress > 0.5,
      touchZoom: false,
    })

    mapRef.current = map

    // Add Esri World Imagery (Satellite) tile layer
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri',
      },
    ).addTo(map)

    // Set initial view based on current progress
    const isZoomed = progress > 0.5
    if (isZoomed) {
      map.setView([11.055, 125.664], 15)
    } else {
      map.setView([11.75, 125.1], 8)
    }

    // Create marker for Bagonbanua (glowing dot + halo)
    // Custom className overrides Leaflet's default .leaflet-div-icon style (removing borders/background)
    const customIcon = L.divIcon({
      className:
        'gdfi-transparent-marker bg-transparent border-none border-0 transition-opacity duration-700 ease-in-out',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <div class="absolute h-10 w-10 animate-pulse rounded-full bg-accent/30"></div>
          <div class="h-3 w-3 rounded-full bg-accent ring-2 ring-background"></div>
        </div>
      `,
      iconSize: [0, 0],
    })

    const marker = L.marker([11.055, 125.664], { icon: customIcon }).addTo(map)
    markerRef.current = marker

    // Hide marker if already zoomed
    if (isZoomed) {
      setTimeout(() => {
        marker.getElement()?.classList.add('opacity-0')
      }, 0)
    }

    // Bind map click to toggle view
    map.on('click', () => {
      onToggle()
    })

    // Bind zoom start/end events to hide polygon outline during zoom movement and avoid stretch artifacts
    map.on('zoomstart', () => {
      updatePolygonOpacity(false)
    })

    map.on('zoomend', () => {
      const isZoomedNow = map.getZoom() > 12
      updatePolygonOpacity(isZoomedNow)

      // Sync marker opacity
      if (markerRef.current) {
        const el = markerRef.current.getElement()
        if (el) {
          if (isZoomedNow) {
            el.classList.add('opacity-0')
            el.classList.remove('opacity-100')
          } else {
            el.classList.add('opacity-100')
            el.classList.remove('opacity-0')
          }
        }
      }
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LState])

  // 4. Update Polygon when geoJsonData is loaded
  useEffect(() => {
    if (!LState || !mapRef.current || !geoJsonData) return
    const L = LState

    if (polygonRef.current) {
      polygonRef.current.remove()
    }

    const geoLayer = L.geoJSON(geoJsonData as Parameters<typeof L.geoJSON>[0], {
      style: () => ({
        className: 'stroke-accent',
        weight: 2.5,
        fill: false, // Ensure fill (shade) is completely disabled
        color: 'var(--color-accent, #e05c3c)',
      }),
    }).addTo(mapRef.current)

    polygonRef.current = geoLayer

    // Sync opacity immediately
    updatePolygonOpacity(progress > 0.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LState, geoJsonData])

  // 5. React to zoom state changes
  const isZoomedRef = useRef(progress > 0.5)
  useEffect(() => {
    if (!mapRef.current || !LState) return

    const isZoomed = progress > 0.5
    if (isZoomed !== isZoomedRef.current) {
      isZoomedRef.current = isZoomed

      if (isZoomed) {
        // Zoom to Bagonbanua MPA close-up
        mapRef.current.flyTo([11.055, 125.664], 15, {
          animate: true,
          duration: 1.6,
        })
        mapRef.current.dragging.enable()

        // Fade out marker immediately
        if (markerRef.current) {
          markerRef.current.getElement()?.classList.add('opacity-0')
          markerRef.current.getElement()?.classList.remove('opacity-100')
        }
      } else {
        // Reset to Samar Island macro view
        mapRef.current.flyTo([11.75, 125.1], 8, {
          animate: true,
          duration: 1.6,
        })
        mapRef.current.dragging.disable()

        // Fade out outline immediately
        updatePolygonOpacity(false)
      }
    }
  }, [progress, LState])

  const zoomed = progress > 0.5
  const labelShown = progress > 0.7

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden select-none rounded-xl border border-foreground/10 shadow-md',
        className,
      )}
    >
      {/* Explicit style overrides:
          1. Completely transparentizes Leaflet's divIcon wrapper to remove default white ticks/lines.
          2. Applies vector-effect: non-scaling-stroke to prevent the outline from scaling up and looking like a solid yellow shape during zoom-in transitions. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .gdfi-transparent-marker {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
            .leaflet-div-icon {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
            .leaflet-interactive {
              vector-effect: non-scaling-stroke !important;
            }
          `,
        }}
      />

      {/* Leaflet map container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full z-0 bg-slate-950 cursor-pointer"
      />

      {/* Inset Map: Responsive size optimized for base mobile, sm, md, and lg viewports */}
      <div
        className={cn(
          'absolute right-3 bottom-3 z-30 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-lg p-2 shadow-lg transition-all duration-500 ease-out transform',
          'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32',
          zoomed
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none',
        )}
      >
        <svg
          viewBox="0 0 1000 1044"
          className="w-full h-full select-none pointer-events-none"
        >
          {/* Samar island silhouette */}
          <path
            d={ISLAND_PATH}
            className="fill-foreground/15 stroke-foreground/5"
            strokeWidth={1}
          />
          {/* Glowing pulse indicator for Bagonbanua location */}
          <circle
            cx={MPA_CENTER.x}
            cy={MPA_CENTER.y}
            r={30}
            className="fill-accent/25 animate-pulse"
          />
          <circle
            cx={MPA_CENTER.x}
            cy={MPA_CENTER.y}
            r={10}
            className="fill-accent stroke-background"
            strokeWidth={2}
          />
        </svg>
        <span className="absolute bottom-0.5 left-0 right-0 text-[8px] sm:text-[9px] font-semibold text-center text-foreground/50 tracking-wider uppercase select-none pointer-events-none">
          Samar
        </span>
      </div>

      {/* Zoomed-in label (HTML overlay, top-centred) */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center transition-opacity duration-500 ease-out',
          labelShown ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wide text-accent backdrop-blur-sm md:text-sm">
          Bagonbanua Marine Reserve &amp; Sanctuary
        </span>
      </div>

      {/* Zoom control */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute left-1/2 bottom-3 -translate-x-1/2 z-30 rounded-full bg-btn-primary px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-btn-primary-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
      >
        {zoomed ? 'Reset view' : 'Zoom to Bagonbanua'}
      </button>
    </div>
  )
}
