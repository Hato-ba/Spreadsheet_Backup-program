function backupSpreadsheet() {
  const sourceFileId = '1QPmdJWgFmxAEvMRSzDecOzr-iQ46NWhEpbLlyxcjGO8'; //バックアップ元のスプシID
  const backupFolderId = '1b4MFo-Yy4bv-p6rGw2FdJV_f3qjCe-kB'; //保存先フォルダのID(Googleドライブ)
  
  const sourceFile = DriveApp.getFileById(sourceFileId);
  const backupFolder = DriveApp.getFolderById(backupFolderId);
  
  const now = new Date();
  const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy.MM.dd_HH:mm.ss');
  const backupName = `${sourceFile.getName()}.backup_${timestamp}`;
  
  const backupFile = sourceFile.makeCopy(backupName, backupFolder);
  
  Logger.log('バックアップ完了: ' + backupFile.getUrl());
}