// ▼ バックアップファイルを作成しGoogleドライブの指定フォルダに入れる
function backupSpreadsheet() {
  const sourceFileId = '1QPmdJWgFmxAEvMRSzDecOzr-iQ46NWhEpbLlyxcjGO8'; //バックアップ元のスプシID
  const backupFolderId = '1b4MFo-Yy4bv-p6rGw2FdJV_f3qjCe-kB'; //保存先フォルダのID(Googleドライブ)
  
  const sourceFile = DriveApp.getFileById(sourceFileId);
  const backupFolder = DriveApp.getFolderById(backupFolderId);
  
  const now = new Date();
  const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const backupName = `${sourceFile.getName()}.${timestamp}.bak`;
  
  const backupFile = sourceFile.makeCopy(backupName, backupFolder);
  
  Logger.log('バックアップ完了: ' + backupFile.getUrl());
}


// ▼ 7日以上前のバックアップファイルを自動削除
function deleteOldBackups() {
  const folderId = '1b4MFo-Yy4bv-p6rGw2FdJV_f3qjCe-kB'; //保存先フォルダのID(Googleドライブ)
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const now = new Date();
  
  while (files.hasNext()) {
    const file = files.next();
    const created = file.getDateCreated();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    
    if (diffDays > 7) {
      file.setTrashed(true);
    }
  }
}

