// Auto-generated barrel for methods
// Run: bun scripts/generate-barrels.ts

// Stitch handlers
export { ListProjectsHandler } from './stitch/listProjects/handler.js';
export { CreateProjectHandler } from './stitch/createProject/handler.js';
export { ConnectHandler } from './stitch/connect/handler.js';
export { GetProjectHandler } from './stitch/getProject/handler.js';

// Project handlers
export { GenerateScreenHandler } from './project/generate/handler.js';
export { ListScreensHandler } from './project/listScreens/handler.js';

// Screen handlers
export { GetScreenHtmlHandler } from './screen/getHtml/handler.js';
export { GetScreenImageHandler } from './screen/getImage/handler.js';

// Stitch specs
export type { ListProjectsSpec, ListProjectsInput, ListProjectsResult } from './stitch/listProjects/spec.js';
export type { CreateProjectSpec, CreateProjectInput, CreateProjectResult } from './stitch/createProject/spec.js';
export type { ConnectSpec, ConnectInput, ConnectResult } from './stitch/connect/spec.js';
export type { GetProjectSpec, GetProjectInput, GetProjectResult } from './stitch/getProject/spec.js';

// Project specs
export type { GenerateScreenSpec, GenerateScreenInput, GenerateScreenResult } from './project/generate/spec.js';
export type { ListScreensSpec, ListScreensInput, ListScreensResult } from './project/listScreens/spec.js';

// Screen specs
export type { GetScreenHtmlSpec, GetScreenHtmlInput, GetScreenHtmlResult } from './screen/getHtml/spec.js';
export type { GetScreenImageSpec, GetScreenImageInput, GetScreenImageResult } from './screen/getImage/spec.js';
