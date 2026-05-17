'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={(spline: any) => {
          try {
            if (spline && spline.scene) {
              spline.scene.background = null
            }
            if (spline && spline.renderer && typeof spline.renderer.setClearColor === 'function') {
              // set clear color with 0 alpha for transparency
              spline.renderer.setClearColor(0x000000, 0)
            }
          } catch (e) {
            // ignore errors silently
          }
        }}
        style={{ background: 'transparent' }}
      />
    </Suspense>
  )
}
