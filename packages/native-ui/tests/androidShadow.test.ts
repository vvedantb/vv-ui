import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

function readSrc(rel: string): string {
  return readFileSync(join(srcDir, rel), "utf8");
}

describe("Android floating shadow rules", () => {
  it("uses boxShadow and never elevation on floatingShadow", () => {
    const src = readSrc("floating.ts");
    expect(src).toMatch(/boxShadow:/);
    expect(src).not.toMatch(/elevation:/);
    expect(src).toMatch(/FLOATING_RADIUS = tokens\.radius\.card/);
    expect(src).toMatch(/FLOATING_ROW_RADIUS = tokens\.radius\.field/);
  });

  it("clips inside FloatingSurface and blurs only on iOS", () => {
    const src = readSrc("FloatingSurface.tsx");
    expect(src).toMatch(/Platform\.OS === "ios"/);
    expect(src).toMatch(/Platform\.OS === "android"/);
    expect(src).toMatch(/styles\.clip/);
    expect(src).not.toMatch(/className=\{cn\("overflow-hidden"/);
  });

  it("does not put NativeWind shadows on nested or translucent chrome", () => {
    const files = [
      "Button.tsx",
      "Chip.tsx",
      "PillTabs.tsx",
      "HeaderIconButton.tsx",
      "ListRow.tsx",
      "settings/SettingsSection.tsx",
    ];
    for (const file of files) {
      expect(readSrc(file), file).not.toMatch(/shadow-(?:sm|md|lg|xl|2xl)\b/);
    }
  });
});
