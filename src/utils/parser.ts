export interface MindElixirNode {
  id: string
  topic: string
  children?: MindElixirNode[]
}

export interface MindElixirData {
  nodeData: MindElixirNode
}

export function parseNumberedTextToTree(text: string): MindElixirData {
  const lines = text.split(/\r?\n/).filter(Boolean)
  const rootNodes: MindElixirNode[] = []
  const nodeMap: Record<string, MindElixirNode> = {}

  for (const line of lines) {
    const match = line.match(/^(\d+(?:\.\d+)*)\)\s+(.*)/)
    if (!match) continue

    const fullIndex = match[1]
    const title = match[2].trim()
    const levelParts = fullIndex.split('.')

    const node: MindElixirNode = {
      id: fullIndex,
      topic: title,
      children: [],
    }

    nodeMap[fullIndex] = node

    if (levelParts.length === 1) {
      rootNodes.push(node)
    } else {
      const parentIndex = levelParts.slice(0, -1).join('.')
      if (nodeMap[parentIndex]) {
        nodeMap[parentIndex].children?.push(node)
      }
    }
  }

  return {
    nodeData: {
      id: 'root',
      topic: 'Mapa Mental',
      children: rootNodes,
    },
  }
}
