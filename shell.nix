# This is a shell.nix file. It is used to create a reproducible
# development environment for people with mac or linux, it is meant to avoid the
# "it works on my machine" problem.
# if you have nix and direnv installed on your machine you can just run `direnv allow` and it will make sure that
# you have all needed dependencies to run your project
{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_18
    yarn
    cypress
  ];

  shellHook = ''
    export GDK_BACKEND=x11
    export ELECTRON_OZONE_PLATFORM_HINT=x11
    export FIREFOX_DISABLE_SANDBOX=1
    export CYPRESS_INSTALL_BINARY=0
    export CYPRESS_RUN_BINARY=${pkgs.cypress}/bin/Cypress


    echo "✅ Cypress shell is ready! Use 'yarn cypress open'"
  '';
}
