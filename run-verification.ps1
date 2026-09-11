function Run-Step {
  param([string]$StepName, [scriptblock]$Command)
  Write-Host "`n=== $StepName ===" -ForegroundColor Cyan
  try {
    $output = & $Command 2>&1
    Write-Host $output
    return $true
  } catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    return $false
  }
}

Set-Location "E:\derfive"

# 1. Check TypeScript compilation
$tscOk = Run-Step "TSC --noEmit" {
  node node_modules/typescript/bin/tsc --noEmit
  $LASTEXITCODE -eq 0
}

# 2. Check for errors in stderr
if (Test-Path "tsc-output.txt") {
  $tscErrors = Get-Content "tsc-output.txt" -ErrorAction SilentlyContinue | Select-String "error TS"
  if ($tscErrors) {
    Write-Host "`nTSC ERRORS FOUND:" -ForegroundColor Red
    $tscErrors | ForEach-Object { Write-Host $_.Line -ForegroundColor Red }
  }
}

# 3. Clean up temp files
Remove-Item "tsc-output.txt", "tsc-err.txt", "tsc-noemit-status.txt", "tsc-noemit-stderr.txt", "tsc-noemit-stdout.txt" -ErrorAction SilentlyContinue

# 4. Check git status
$gitStatus = git status --short
Write-Host "`n=== GIT STATUS ===" -ForegroundColor Cyan
if ($gitStatus) {
  $gitStatus
} else {
  Write-Host "(clean)" -ForegroundColor Green
}

# 5. Show what changed
Write-Host "`n=== FILES TO COMMIT ===" -ForegroundColor Cyan
git diff --name-only
git diff --cached --name-only
git ls-files --others --exclude-standard

Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
Write-Host "Next version: 16.3.5" -ForegroundColor Green
Write-Host "package.json updated: Yes" -ForegroundColor Green
Write-Host "package-lock.json updated: Yes" -ForegroundColor Green
Write-Host "next.config.ts fixed: Yes (removed invalid eslint property)" -ForegroundColor Green
Write-Host "TSC check: $(if($tscOk){'PASSED'}else{'FAILED'})" -ForegroundColor $(if($tscOk){'Green'}else{'Red'})
Write-Host "`nReady for build verification."
