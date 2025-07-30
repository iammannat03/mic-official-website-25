import React from 'react';
import Image from 'next/image';
import { ControlType } from './types';
import { CONTROLS } from './constants';

interface ArcadeControlsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

export function ArcadeControls({ tab, onTabChange }: ArcadeControlsProps) {
  return (
    <>
      {CONTROLS.map((ctrl, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: ctrl.left,
            top: ctrl.top,
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => onTabChange(ctrl.key)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              outline: 'none',
              cursor: 'pointer',
            }}
            aria-label={ctrl.label}
          >
            <Image
              src={
                ctrl.type === 'joystick' 
                  ? (tab === ctrl.key ? '/images/joystick-selected.png' : '/images/arcade-joystick.png')
                  : '/images/arcade-button.png'
              }
              alt={ctrl.type}
              width={ctrl.type === 'joystick' ? 60 : 56}
              height={ctrl.type === 'joystick' ? 60 : 56}
              style={{
                filter: tab === ctrl.key && ctrl.type === 'button' ? 'brightness(1.2) drop-shadow(0 0 8px #ffe066)' : 'none',
                transition: 'filter 0.2s',
              }}
            />
          </button>
        </div>
      ))}
    </>
  );
} 