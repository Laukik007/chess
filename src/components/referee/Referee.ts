import { PieceType, TeamType,Piece, Position} from "../../Constants";
import { bishopMove,getAllPossiblePawanMoves,kingMove,knightMove,pawnMove,queenMove,rookMove,getAllPossibleKnightMoves, getAllPossibleBishopMoves, getAllPossibleRookMoves, getAllPossibleQueenMoves, getAllPossibleKingMoves} from "./rules";

export default class Referee {
isValidMove(
  initialPosition:Position,
  desiredPosition:Position,
  type:PieceType,
  team:TeamType,
  boardState:Piece[]  
) {
  let validMove=false;
  switch(type){
    case PieceType.PAWN:
      validMove=pawnMove(initialPosition,desiredPosition,team,boardState);
      break;
      case PieceType.KNIGHT:
      validMove=knightMove(initialPosition,desiredPosition,team,boardState);
      break;
        case PieceType.BISHOP:
      validMove=bishopMove(initialPosition,desiredPosition,team,boardState);
      break;
        case PieceType.ROOK:
      validMove=rookMove(initialPosition,desiredPosition,team,boardState);
      break;
      case PieceType.QUEEN:
        validMove=queenMove(initialPosition,desiredPosition,team,boardState);
      break;
      case PieceType.KING:
      validMove=kingMove(initialPosition,desiredPosition,team,boardState);
      
  }
  return validMove;
}

getValidMoves(piece:Piece,boardState:Piece[]):Position[]{
  switch(piece.type){
    case PieceType.PAWN:
    return getAllPossiblePawanMoves(piece,boardState)
    case PieceType.KNIGHT:
    return getAllPossibleKnightMoves(piece,boardState)
    case PieceType.BISHOP:
    return getAllPossibleBishopMoves(piece,boardState)
    case PieceType.ROOK:
    return getAllPossibleRookMoves(piece,boardState)
    case PieceType.QUEEN:
    return getAllPossibleQueenMoves(piece,boardState)
    case PieceType.KING:
    return getAllPossibleKingMoves(piece,boardState)
    default:
      return [];
  }
}
}
