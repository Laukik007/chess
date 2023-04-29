import { Piece, Position, samePosition, TeamType } from "../../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileisOccupied, tileisOccupiedByOpponent } from "./GeneralRules";

export const bishopMove=(
  initialPosition:Position,
  desiredPosition:Position,
  team:TeamType,
  boardState:Piece[]):
  boolean=>{
  for(let i=1; i<8; i++){
    //top right movement
    if(desiredPosition.x>initialPosition.x && desiredPosition.y<initialPosition.y){
      let passedPostion:Position={x:initialPosition.x+i,y:initialPosition.y-i};
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
    
    //bottom right
    if(desiredPosition.x>initialPosition.x && desiredPosition.y>initialPosition.y){
      let passedPostion:Position={x:initialPosition.x+i,y:initialPosition.y+i};
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
    //bottom left
    if(desiredPosition.x<initialPosition.x && desiredPosition.y>initialPosition.y){
      let passedPostion:Position={x:initialPosition.x-i,y:initialPosition.y+i};
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
    //top left
    if(desiredPosition.x<initialPosition.x && desiredPosition.y<initialPosition.y){
      let passedPostion:Position={x:initialPosition.x-i,y:initialPosition.y-i};
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
  }

return false;
}
export const getAllPossibleBishopMoves=(bishop:Piece,boardState:Piece[]):Position[]=>{
  const possibleMoves:Position[]=[];
  for(let i=1; i<8; i++){
    const destination:Position={x:bishop.position.x+i,y:bishop.position.y+i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,bishop.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
    const destination:Position={x:bishop.position.x+i,y:bishop.position.y-i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,bishop.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
    const destination:Position={x:bishop.position.x-i,y:bishop.position.y+i}
    if(!tileisOccupied(destination,boardState)){
      possibleMoves.push(destination);
    }else if(tileisOccupiedByOpponent(destination,boardState,bishop.team)){
      possibleMoves.push(destination);
      break;
    }else{
      break;
    }
  }
  for(let i=1; i<8; i++){
  const destination:Position={x:bishop.position.x-i,y:bishop.position.y-i}
  if(!tileisOccupied(destination,boardState)){
    possibleMoves.push(destination);
  }else if(tileisOccupiedByOpponent(destination,boardState,bishop.team)){
    possibleMoves.push(destination);
    break;
  }else{
    break;
  }
  }
  return possibleMoves;
}