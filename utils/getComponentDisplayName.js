// Gets the display name of a JSX component for dev tools
export default function getComponentDisplayName (Component) {
    return Component.displayName || Component.name || 'Unknown'
}