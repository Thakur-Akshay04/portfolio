/**
 * Suppresses the THREE.Clock deprecation warning emitted by three.js r183+.
 * @react-three/fiber v9 still uses THREE.Clock internally.
 * Import this file once in any client component that uses @react-three/fiber.
 */

if (typeof window !== "undefined") {
  const originalWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    // Filter the THREE.Clock deprecation warning from r3f internals
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock") &&
      args[0].includes("deprecated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export {};
