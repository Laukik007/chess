import { Piece, Position, samePosition, TeamType } from "../../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileisOccupied, tileisOccupiedByOpponent } from "./GeneralRules";

export const queenMove=(
initialPosition:Position,
desiredPosition:Position,
team:TeamType,
boardState:Piece[]):
boolean=>{

  for(let i=1; i<8; i++){
    let multiplierX=(desiredPosition.x<initialPosition.x)?-1:(desiredPosition.x>initialPosition.x)?1:0;
    let multiplierY=(desiredPosition.y>initialPosition.y)?-1:(desiredPosition.y<initialPosition.y)?1:0;
    let passedPostion:Position={x:initialPosition.x+(i*multiplierX),y:initialPosition.y-(i*multiplierY)};
    if(samePosition(passedPostion,desiredPosition)){
      //dealing with final position tile
      if(tileIsEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)){
        return true;
      }
    }
    else{
      //dealing with passing tile
      if(tileisOccupied(passedPostion,boardState)){
        break;
      }
    }
    
  }
  return false;
}
export const getAllPossibleQueenMoves=(queen:Piece,boardState:Piece[]):Position[]=>{
  const possibleMoves:Position[]=[];
  for(let i=1; i<8; i++){
    const destination:Position={x:queen.position.x+i,y:queen.position.y+i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
    const destination:Position={x:queen.position.x+i,y:queen.position.y-i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
    const destination:Position={x:queen.position.x-i,y:queen.position.y+i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
  const destination:Position={x:queen.position.x-i,y:queen.position.y-i}
  if(!tileisOccupied(destination,boardState)){
    possibleMoves.push(destination);
  }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
    possibleMoves.push(destination);
    break;
  }else{
    break;
  }
  }
   for(let i=1; i<8; i++){
      const destination:Position={x:queen.position.x,y:queen.position.y+i}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:queen.position.x,y:queen.position.y-i}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:queen.position.x+i,y:queen.position.y}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
    for(let i=1; i<8; i++){
      const destination:Position={x:queen.position.x-i,y:queen.position.y}
        if(!tileisOccupied(destination,boardState)){
        possibleMoves.push(destination);
        }else if(tileisOccupiedByOpponent(destination,boardState,queen.team)){
        possibleMoves.push(destination);
        break;
        }else{
        break;
        }
    }
  return possibleMoves;
}