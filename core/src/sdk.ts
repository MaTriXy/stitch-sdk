import { StitchMCPClient } from "./client.js";
import { Project } from "./project.js";
import { StitchConfigInput, ProjectData } from "./types.js";

/**
 * Main entry point for the Stitch SDK.
 * Provides access to projects and their screens.
 */
export class Stitch {
  private client: StitchMCPClient;

  constructor(config?: StitchConfigInput) {
    this.client = new StitchMCPClient(config);
  }

  async connect() {
    await this.client.connect();
  }

  /**
   * Access a project by ID.
   */
  project(id: string): Project {
    return new Project(this.client, id);
  }

  /**
   * Create a new project.
   */
  async createProject(title: string): Promise<Project> {
    const data = await this.client.callTool<ProjectData>("create_project", { title });
    return new Project(this.client, data.name, data);
  }

  /**
   * List all projects.
   */
  async projects(): Promise<Project[]> {
    const res = await this.client.callTool<{ projects: ProjectData[] }>("list_projects", {});
    return (res.projects || []).map((p: ProjectData) => new Project(this.client, p.name, p));
  }
}