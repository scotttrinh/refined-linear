{ pkgs ? import <nixpkgs> {} }:

with pkgs;

let
  nodejs = nodejs-12_x;
in

pkgs.mkShell {
    buildInputs = [ nodejs ];
}

