// Allow side-effect CSS imports from third-party packages (e.g. leaflet, react-leaflet-cluster)
declare module "*.css" {
    const content: Record<string, string>
    export default content
}
