import { StitchMCPClient } from "./client.js";
import { Screen } from "./screen.js";
import { ProjectData, ScreenInstance } from "./types.js";

/**
 * Represents a Stitch Project.
 * Provides methods to generate and list screens.
 */
export class Project {
  constructor(
    private client: StitchMCPClient,
    public id: string,
    public data?: ProjectData
  ) { }

  /**
   * Generates a screen and returns a Screen object.
   */
  async generate(prompt: string, deviceType: "DESKTOP" | "MOBILE" = "DESKTOP"): Promise<Screen> {
    const data = await this.client.callTool<ScreenInstance>("generate_screen_from_text", {
      projectId: this.id,
      prompt,
      deviceType
    });

    // Return the Screen wrapper, not just the raw data
    return new Screen(this.client, this.id, data);
  }

  /**
   * List all screens in this project.
   */
  async screens(): Promise<Screen[]> {
    const res = await this.client.callTool<{ screens: ScreenInstance[] }>("list_screens", {
      projectId: this.id
    });

    // Map raw data to Screen objects
    return (res.screens || []).map((s: ScreenInstance) => new Screen(this.client, this.id, s));
  }
}
