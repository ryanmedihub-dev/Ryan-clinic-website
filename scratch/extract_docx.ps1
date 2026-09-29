Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('C:\Users\patwa\Downloads\Home Page Edit.docx')
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$matches = [regex]::Matches($xml, '<w:p\b[^>]*>(.*?)</w:p>')
$lines = @()
foreach ($m in $matches) {
    $tMatches = [regex]::Matches($m.Groups[1].Value, '<w:t\b[^>]*>(.*?)</w:t>')
    $line = ($tMatches | ForEach-Object { $_.Groups[1].Value }) -join ''
    if ($line.Trim().Length -gt 0) {
        $lines += $line
    }
}
$fullText = $lines -join "`n"
[System.IO.File]::WriteAllText('C:\Users\patwa\Desktop\clinicRyan\Ryan-next-project-new\scratch\docx_paragraphs.txt', $fullText)
Write-Host "Extracted paragraphs count: $($lines.Count)"
