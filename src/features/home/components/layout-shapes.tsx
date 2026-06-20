import { cn } from '@/lib/utils'

const RIGHT_UP_CURVE_DESKTOP_PATH =
  'M1789.403,2754.712C1836.699,2821.238 1915.702,2859.579 2032.839,2864.024L2494.79,2864.024L386.691,2864.024L386.691,2317.861L1253.726,2317.861C1402.095,2318.076 1490.768,2367.359 1579.143,2483.69L1789.403,2754.712Z'
const RIGHT_UP_CURVE_MOBILE_PATH =
  'M1782.511,2745.828C1834.466,2816.622 1923.32,2864.261 2088.463,2864.024L2314.12,2864.024L386.691,2864.024L386.691,2317.861L1253.726,2317.861C1402.095,2318.076 1490.768,2367.359 1579.143,2483.69L1782.511,2745.828Z'

function CurveSvgs({
  flipClassName,
  desktopPath,
  mobilePath,
  edge = 'bottom',
}: {
  flipClassName?: string
  desktopPath: string
  mobilePath: string
  edge?: 'top' | 'bottom'
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 z-20',
        edge === 'top' ? '-top-px' : '-bottom-px',
      )}
      aria-hidden="true"
    >
      {/* Desktop */}
      <svg
        className={cn(
          'hidden h-auto w-full fill-background transition-colors duration-300 ease-[ease] md:block',
          flipClassName,
        )}
        viewBox="0 0 4727 547"
        preserveAspectRatio="none"
      >
        <g transform="matrix(1,0,0,1,-60.770062,-1480.855676)">
          <g transform="matrix(1,0,0,1,-48.843721,-762.407557)">
            <g transform="matrix(1,0,0,1,-277.077636,-74.597825)">
              <path d={desktopPath} fillRule="evenodd" clipRule="evenodd" />
            </g>
          </g>
        </g>
      </svg>
      {/* Mobile */}
      <svg
        className={cn(
          'block h-auto w-full fill-background transition-colors duration-300 ease-[ease] md:hidden',
          flipClassName,
        )}
        viewBox="0 0 2960 746"
        preserveAspectRatio="none"
      >
        <g transform="matrix(1,0,0,1,-1755.474488,-2333.400621)">
          <g transform="matrix(1,0,0,1,1645.860705,289.952609)">
            <g transform="matrix(1,0,0,1.365853,-277.077636,-1122.409352)">
              <path d={mobilePath} fillRule="evenodd" clipRule="evenodd" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export function RightUpCurve() {
  return (
    <CurveSvgs
      flipClassName="-scale-x-100"
      desktopPath={RIGHT_UP_CURVE_DESKTOP_PATH}
      mobilePath={RIGHT_UP_CURVE_MOBILE_PATH}
    />
  )
}
