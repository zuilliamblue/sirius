# auto-push.ps1 — commit + push automáticos em loop
# Frequência (segundos)
$interval = 60

function Has-Changes {
  $status = git status --porcelain
  return -not [string]::IsNullOrWhiteSpace($status)
}

Write-Host "Auto-push rodando a cada $interval s. Pressione Ctrl+C para parar." -ForegroundColor Cyan

while ($true) {
  try {
    if (Has-Changes) {
      git add -A | Out-Null

      # Mensagem com data/hora
      $stamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
      git commit -m "auto: sync $stamp" | Out-Null

      # Tenta enviar; se falhar (ex.: conflito), apenas mostra o erro e segue o loop
      git push origin main
    }
  } catch {
    Write-Host "Aviso: $($_.Exception.Message)" -ForegroundColor Yellow
  }

  Start-Sleep -Seconds $interval
}
