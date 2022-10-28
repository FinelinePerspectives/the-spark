
<?php
	header("Access-Control-Allow-Origin: *");
	require 'PHPMailerAutoload.php';
	
	$mail = new PHPMailer;
	$subject = "Contact email from The Spark";
	
	$userFirstName = filter_var($_POST["userLastName"], FILTER_SANITIZE_STRING);
	$userLastName = filter_var($_POST["userLastName"], FILTER_SANITIZE_STRING);
	$userEmail = filter_var($_POST["userEmail"], FILTER_SANITIZE_STRING);
	$userPhone = filter_var($_POST["userPhone"], FILTER_SANITIZE_STRING);
	$userMessage = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
	
	$mail->addAddress('rpeterson@finelineperspectives.com', 'The Spark');
	$mail->addBCC('rpeterson@finelineperspectives.com', 'Ryan Peterson');
	$mail->setFrom('rpeterson@finelineperspectives.com', 'The Spark');

	$email_body =	
	'
		    <html>
		    <head>
		      <title>Contact Email</title>
		    </head>
		    <body>
		      <p style="font-size: 18px; font-weight: bold;">You have received a new email inquiry from the website</p>
		      <table width="70%" border-top="0.5" cellpadding="5" cellspacing="0" style="border-style: solid; border-width: 1px; border-color:#EAF2FA;">
		        
				<tr bgcolor="#EAF2FA">
		          <td colspan="2">
			          <font style="font-size:12px">
			          	<strong>First Name:</strong>
			          </font>
			       </td>
		        </tr>
		        <tr>
		        	<td width="20">&nbsp;</td>
					<td bgcolor="#FFFFFF">
						'.$userFirstName.'
					</td>
		        </tr>
		        
				<tr bgcolor="#EAF2FA">
		          <td colspan="2">
			          <font style="font-size:12px">
			          	<strong>Last Name:</strong>
			          </font>
			       </td>
		        </tr>
		        <tr>
		        	<td width="20">&nbsp;</td>
					<td bgcolor="#FFFFFF">
						'.$userLastName.'
					</td>
		        </tr>
				
				<tr bgcolor="#EAF2FA">
		          <td colspan="2">
			          <font style="font-size:12px">
			          	<strong>Email:</strong>
			          </font>
			       </td>
		        </tr>
		        <tr>
		        	<td width="20">&nbsp;</td>
					<td bgcolor="#FFFFFF">
						'.$userEmail.'
					</td>
		        </tr>

				<tr bgcolor="#EAF2FA">
		          <td colspan="2">
			          <font style="font-size:12px">
			          	<strong>Phone:</strong>
			          </font>
			       </td>
		        </tr>
		        <tr>
		        	<td width="20">&nbsp;</td>
					<td bgcolor="#FFFFFF">
						'.$userPhone.'
					</td>
		        </tr>

				<tr bgcolor="#EAF2FA">
		          <td colspan="2">
			          <font style="font-size:12px">
			          	<strong>Message:</strong>
			          </font>
			       </td>
		        </tr>
		        <tr>
		        	<td width="20">&nbsp;</td>
					<td bgcolor="#FFFFFF">
						'.$userMessage.'
					</td>
		        </tr>
				
		      </table>
		    </body>
		    </html>
		';

	
	$mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = $subject;
	$mail->Body    = $email_body;
	
	if(!$mail->send()) {
		echo 'Your form submission is not complete. To try again please';
		echo ': ' . $mail->ErrorInfo;
	} else {
		echo 'Thank you for your message. We will be in touch soon.';
	}
?>



