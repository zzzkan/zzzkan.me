import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";

export const FountainParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadBubblesPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        size: {
          value: {
            min: 50,
            max: 5,
          },
        },
      },
      preset: "bubbles",
    }),
    []
  );

  if (init) return <Particles id="tsparticles-bubbles" options={options} />;
  return <></>;
};
