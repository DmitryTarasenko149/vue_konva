export function rectTableConstructor(seatNumbers, tableInfo) { //tableInfo = {tableX, tableY, width, height}

  let config = {
    radius: 10,
    fill: "grey",
    stroke: "black",
    strokeWidth: 1,
    name: "seat",
    id: 1
  }

  let coords = getRectTablePlaces(seatNumbers, config.radius, tableInfo)

  return coords.map(({ x, y }) => { 
    return { ...config, x, y }
  })
}

export function getRectTablePlaces(seatNumbers, seatRadius, {tableX, tableY, width, height}) {
  let x = 0; 
  let y = 0;

  let space = seatRadius * 2
  
  let coords = []

  coords.push({ x: tableX - space, y: tableY + height / 2 })
  coords.push({ x: tableX + width / 2, y: tableY - space })
  coords.push({ x: tableX + width + space, y: tableY + height / 2 })
  coords.push({ x: tableX + width/2 , y: tableY + height + space})

  return coords;
}


export function circleTableConstructor(seatNumbers, tableInfo) { //tableInfo = {tableX, tableY, width, height}

  let config = {
    radius: 10,
    fill: "grey",
    stroke: "black",
    strokeWidth: 1,
    name: "seat",
    id: 1
  }

  let coords = getCircleTablePlaces(seatNumbers, config.radius, tableInfo)

  return coords.map(({ x, y }) => { 
    return { ...config, x, y }
  })
}

export function getCircleTablePlaces(seatNumbers, seatRadius, {tableX, tableY, radius}) {
  let x = 0; 
  let y = 0;

  let space = seatRadius * 2
  
  let coords = []

  coords.push({ x: tableX - space - radius, y: tableY })
  coords.push({ x: tableX + radius + space, y: tableY })
  coords.push({ x: tableX, y: tableY - radius - space})
  coords.push({ x: tableX, y: tableY + radius + space})

  // coords.push({ x: tableX + width / 2, y: tableY - space })
  // coords.push({ x: tableX + width + space, y: tableY + height / 2 })
  // coords.push({ x: tableX + width/2 , y: tableY + height + space})

  return coords;
}