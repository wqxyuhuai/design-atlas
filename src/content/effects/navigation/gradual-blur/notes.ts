export const notes = `Original website: https://reactbits.dev/animations/gradual-blur?position=top&strength=5&divCount=4

Use case: fixed or sticky navigation, scroll containers, top/bottom fades, and edge treatments where hard boundaries feel too abrupt.

Design points: place the component inside a positioned parent with overflow hidden. The overlay should sit above scrolling content but below real clickable navigation unless hover interaction is intentional.

Parameter notes: position chooses the attached edge, strength controls blur energy, divCount controls how smooth the transition feels, curve redistributes the layers, and exponential makes the far edge more intense. The default uses the linked ReactBits settings: position top, strength 5, divCount 4.`;
