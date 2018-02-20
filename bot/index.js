/**
 * This class handles basic interaction with the user.
 */

const ANSWERS = {
	yes: /oui|ok|wesh|d'accord|yep|tout à fait|ouais/i,
	no: /non|bof|la flemme|plus tard|nul|prout|pas du tout/i
};

module.exports = function(bp) {
	//Hello
	bp.hear(/GET_STARTED|bonjour|salut|yo|wesh|hello/i, (event, next) => {
		if(bp.convo.find(event)) {
			return;
		}
		
		bp.convo.start(event, convo => {
			convo.threads['default'].addMessage('#start');
			
			convo.threads['default'].addQuestion('#askcontrib', response => {
				if(ANSWERS.yes.test(response.text)) {
					convo.say('#contrib');
					convo.switchTo('bus');
				}
				else if(ANSWERS.no.test(response.text)) {
					convo.stop('aborted');
				}
				else {
					convo.repeat();
				}
			});
			
			convo.createThread('bus');
			convo.threads['bus'].addQuestion(
				'#seebus',
				{
					bus_stop_name: 'République',
					bus_line_ref: 'C4',
					bus_line_direction: 'Champs Blancs'
				},
				response => {
					if(ANSWERS.yes.test(response.text)) {
						convo.switchTo('checkbusname');
					}
					else if(ANSWERS.no.test(response.text)) {
						convo.say('#cantseebus');
						convo.next();
					}
					else {
						convo.repeat();
					}
				}
			);
			
			convo.createThread('checkbusname');
			convo.threads['checkbusname'].addQuestion(
				'#checkname',
				{ bus_stop_name: 'République' },
				response => {
					if(ANSWERS.yes.test(response.text)) {
						convo.say('#busnameok');
						convo.next();
					}
					else if(ANSWERS.no.test(response.text)) {
						convo.switchTo('setbusname');
					}
					else {
						convo.repeat();
					}
				}
			);
			
			convo.createThread('setbusname');
			convo.threads['setbusname'].addQuestion('#whatbusname', response => {
				convo.say(`L'arrêt s'appelle donc "${response.text}"`);
				convo.switchTo('confirmbusname');
			});
			
			convo.createThread('confirmbusname');
			convo.threads['confirmbusname'].addQuestion(
				"Tu valides ?",
				response => {
					if(ANSWERS.yes.test(response.text)) {
						convo.say('#busnameok');
						convo.next();
					}
					else {
						convo.switchTo('setbusname');
					}
				}
			);
			
			convo.on("done", () => {
				convo.say('#seeya');
			});
			
			convo.on("aborted", () => {
				convo.say('#later');
			});
		});
	});
}
