/* istanbul ignore file */
import { runOne } from "./one";
import { runTwo } from "./two";
import { runThree } from "./three";

export function runAll() {
  runOne();
  runTwo();
  runThree();
}
