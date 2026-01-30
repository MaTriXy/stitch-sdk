import { StitchMCPClient } from "./client.js";
import { ScreenInstance } from "./types.js";

/**
 * Represents a specific Screen.
 * Allows fetching heavy assets (HTML/Image) only when requested.
 */
export class Screen {
  constructor(
    private client: StitchMCPClient,
    public projectId: string,
    public data: ScreenInstance
  ) { }

  get id() { return this.data.id; }

  /**
   * Fetches the raw HTML code for this screen.
   * Maps to: get_screen_html
   */
  async getHtml(): Promise<string> {
    const result = await this.client.callTool<any>("get_screen_html", {
      projectId: this.projectId,
      screenId: this.id
    });

    // Handle signed URL vs direct content
    const url = result.uri || result.url || result.downloadUrl;
    if (url) {
      const res = await fetch(url);
      return res.text();
    }
    return result.htmlCode || "";
  }

  /**
   * Fetches the screenshot URL or binary for this screen.
   * Maps to: get_screen_image
   */
  async getImage(): Promise<string> {
    const result = await this.client.callTool<any>("get_screen_image", {
      projectId: this.projectId,
      screenId: this.id
    });
    return result.uri || result.url || result.downloadUrl;
  }
}
