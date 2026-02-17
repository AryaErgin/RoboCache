import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

const nodes = [
  { city: 'Istanbul', role: 'Falcon 500 Motors', x: 14, y: 56, lx: 16, ly: 2, pulse: 1 },
  { city: 'Bursa', role: '4 in Colson Wheels', x: 24, y: 52, lx: 16, ly: -28, pulse: 0.82 },
  { city: 'Izmir', role: 'REV Spark MAX', x: 18, y: 71, lx: 16, ly: 0, pulse: 1.08 },
  { city: 'Ankara', role: 'Swerve Bevel Gears', x: 38, y: 44, lx: 14, ly: -6, pulse: 0.88 },
  { city: 'Samsun', role: 'CANcoder Sensors', x: 56, y: 28, lx: 14, ly: -8, pulse: 0.92 },
  { city: 'Adana', role: 'PDH Harness Kits', x: 66, y: 68, lx: 14, ly: 0, pulse: 1.16 },
];

const routes = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
];

function MapPreviewScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rc-map-scene" role="img" aria-label="Regional robotics component availability map">
      <div className="rc-map-grid" aria-hidden="true" />
      <svg className="rc-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {routes.map(([fromIndex, toIndex]) => {
          const from = nodes[fromIndex];
          const to = nodes[toIndex];
          return (
            <line
              key={`${from.city}-${to.city}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.city}
          className="rc-map-node"
          style={
            {
              '--node-x': `${node.x}%`,
              '--node-y': `${node.y}%`,
              '--label-x': `${node.lx}px`,
              '--label-y': `${node.ly}px`,
            } as CSSProperties
          }
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.7 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.72, 1, 0.72],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 3 * node.pulse,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: node.pulse * 0.28,
          }}
        >
          <span className="rc-map-node-dot" />
          <span className="rc-map-node-label">
            {node.city}
            <strong>{node.role}</strong>
          </span>
        </motion.div>
      ))}

      <div className="rc-map-live-tag">
        <span className="rc-map-live-indicator" />
        Live regional part availability
      </div>
    </div>
  );
}

export default MapPreviewScene;
