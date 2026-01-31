<#
.SYNOPSIS
    31-Day JavaScript Mastery Series - January 2026 Git Commit Script
.DESCRIPTION
    Automates the generation and backdated git commits for all 31 days of the JavaScript curriculum
    spanning January 1, 2026 through January 31, 2026.
.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\commit_january_2026.ps1
#>

$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptPath

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   31-DAY JAVASCRIPT MASTERY GIT COMMIT SCRIPT   " -ForegroundColor Yellow
Write-Host "   Targeting: January 1, 2026 - January 31, 2026  " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan

# Verify Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python is required to run this script. Please install Python."
    exit 1
}

# Run commit_31_days.py
python commit_31_days.py --author "shoeb0023" --email "sshoeb0023@gmail.com"
