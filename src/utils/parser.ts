export interface MindElixirNode {
  id: string
  topic: string
  note?: string
  children?: MindElixirNode[]
}

export interface MindElixirData {
  nodeData: MindElixirNode
}

export function parseTextToTree(text: string, title: string): MindElixirData {
  if (isMarkdown(text)) {
    return parseMarkdownHeadings(text, title)
  } else {
    return parseNumberedStructure(text, title)
  }
}

function isMarkdown(text: string): boolean {
  return /^#+\s+/m.test(text)
}

function parseMarkdownHeadings(text: string, title: string): MindElixirData {
  const lines = text.split(/\r?\n/)
  const rootNodes: MindElixirNode[] = []
  const nodeStack: MindElixirNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const match = line.match(/^(#+)\s+(.*)/)
    if (!match) continue

    const level = match[1].length
    const topic = match[2]

    const node: MindElixirNode = {
      id: `md-${i}`,
      topic,
      children: [],
    }

    const nextLine = lines[i + 1]?.trim()
    if (nextLine && !nextLine.startsWith('#')) {
      node.note = nextLine
      i++
    }

    while (nodeStack.length >= level) {
      nodeStack.pop()
    }

    if (nodeStack.length === 0) {
      rootNodes.push(node)
    } else {
      const parent = nodeStack[nodeStack.length - 1]
      parent.children?.push(node)
    }

    nodeStack.push(node)
  }

  return {
    nodeData: {
      id: 'root',
      topic: title,
      children: rootNodes,
    },
  }
}

function parseNumberedStructure(text: string, title: string): MindElixirData {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  const rootNodes: MindElixirNode[] = []
  const nodeMap: Record<string, MindElixirNode> = {}

  let i = 0
  while (i < lines.length) {
    const match = lines[i].match(/^(\d+(?:\.\d+)*)(?:[)\.-])?\s+(.*)/)
    if (!match) {
      i++
      continue
    }

    const fullIndex = match[1]
    const title = match[2]
    const node: MindElixirNode = {
      id: fullIndex,
      topic: title,
      children: [],
    }

    const nextLine = lines[i + 1]
    if (nextLine && !/^\d+(\.\d+)*[)\.-]?\s+/.test(nextLine)) {
      node.note = nextLine
      i++
    }

    const level = fullIndex.split('.').length
    nodeMap[fullIndex] = node

    if (level === 1) {
      rootNodes.push(node)
    } else {
      const parentIndex = fullIndex.split('.').slice(0, -1).join('.')
      nodeMap[parentIndex]?.children?.push(node)
    }

    i++
  }

  return {
    nodeData: {
      id: 'root',
      topic: title,
      children: rootNodes,
    },
  }
}
