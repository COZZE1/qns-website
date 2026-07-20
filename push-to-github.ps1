# Run after: gh auth login
# Creates NEW public repo qns-website (does NOT touch Quantum-Narrative-Matrix)
$ErrorActionPreference = "Stop"
$gh = "D:\Temp\gh-cli\bin\gh.exe"
if (-not (Test-Path $gh)) { $gh = "gh" }

Set-Location $PSScriptRoot

& $gh auth status
$user = (& $gh api user --jq .login)
Write-Host "Logged in as: $user"

# Create separate public repo for the website only
& $gh repo create qns-website --public --description "Quantum Narrative School official website (proprietary, not open source)" --source=. --remote=origin --push
Write-Host "Pushed. Enable Pages: Settings -> Pages -> Branch main / root"
Write-Host "Preview: https://$user.github.io/qns-website/"
