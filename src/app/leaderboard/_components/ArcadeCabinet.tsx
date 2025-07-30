import React, { useState } from 'react';
import Image from 'next/image';
import { ARCADE_WIDTH, ARCADE_HEIGHT, SANS_FONT } from './constants';
import { ArcadeScreen } from './ArcadeScreen';
import { ArcadeControls } from './ArcadeControls';

interface ArcadeCabinetProps {
  scale: number;
}

export function ArcadeCabinet({ scale }: ArcadeCabinetProps) {
  const [tab, setTab] = useState('all');

  return (
    <div
      style={{
        position: 'relative',
        width: ARCADE_WIDTH * scale,
        height: ARCADE_HEIGHT * scale,
        zIndex: 1,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: ARCADE_WIDTH,
          height: ARCADE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <Image
          src="/images/arcade.svg"
          alt="Arcade Cabinet"
          width={ARCADE_WIDTH}
          height={ARCADE_HEIGHT}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            width: '100%',
            height: '100%',
          }}
          priority
        />
        
        <ArcadeScreen tab={tab} />
        <ArcadeControls tab={tab} onTabChange={setTab} />
      </div>
    </div>
  );
} 