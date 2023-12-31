function sendLogsToDrive() {
    var threads = GmailApp.getInboxThreads();
    for (var i = 0; i < threads.length; i++) {
      // Manually editable variables
      let requiredSubject = '<The subject goes here>';
      let requiredFrom = '<The FROM address/name goes here>';
      let driveFolder = DriveApp.getFolderById('<Drive folder ID (found in its URL)>');
      let label = '<The label goes here>';
      
      // Variables generated by the script
      let emailSubject = threads[i].getFirstMessageSubject();
      let emailFrom = threads[i].getMessages()[0].getFrom();
      let targetLabel = GmailApp.getUserLabelByName(label);
  
      // Only run the code below if the message has the right subject and sender
      if (emailSubject.includes(requiredSubject) && emailFrom.includes(requiredFrom)) {
        let emailId = threads[i].getId();
        let emailAttachment = GmailApp.getMessageById(emailId).getAttachments();
        // Send attachmen to Drive folder
        emailAttachment.forEach(function(newFile) {
          driveFolder.createFile(newFile.copyBlob()).setName(newFile.getName());
        })
        // Then move the email to the corresponding label (and remove it from Inbox)
        threads[i].addLabel(targetLabel);
        threads[i].moveToArchive();
      }
    }
  }
  