// в этой переменной хранится ссылка на экземпляр XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();
// создает экземпляр XMLHttpRequest 
function createXmlHttpRequestObject() {
	// для хранения ссылки на объект XMLHttpRequest 
	var xmlHttp;
	// этот участок кода работает во всех броузерах,
	// за исключением IE6 и более старых версий
	try {
		// попытаться создать объект XMLHttpRequest 
		xmlHttp = new XMLHttpRequest();
	}
	catch (e) {
		// предположительно IE6 или более старой версии
		var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
			"MSXML2.XMLHTTP.5.0",
			"MSXML2.XMLHTTP.4.0",
			"MSXML2.XMLHTTP.3.0",
			"MSXML2.XMLHTTP",
			"Microsoft.XMLHTTP");
		// попробовать все возможные prog id, 
		// пока какая либо попытка не увенчается успехом
		for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
			try {
				// попытаться создать объект XMLHttpRequest 
				xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
			}
			catch (e) { }
		}
	}
	// вернуть созданный объект или вывести сообщение об ошибке
	if (!xmlHttp)
		alert("Ошибка создания объекта XMLHttpRequest.");
	else
		return xmlHttp;
}
// вызывается для чтения файла с сервера
function process() {
	// продолжать только если в xmlHttp не пустая ссылка
	if (xmlHttp) {
		// попытаться установить соединение с сервером
		try {
			// инициировать чтение файла async.txt с сервера
			xmlHttp.open("GET", "async.txt", true);
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
		}
		// вывести сообщение об ошибке в случае неудачи
		catch (e) {
			alert("Невозможно соединиться с сервером:\n" + e.toString());
		}
	}
}
// функция обработки ответа HTTP
function handleRequestStateChange() {
	// получить ссылку на элемент <div> на странице
	myDiv = document.getElementById("myDivElement");
	// вывести состояние запроса
	if (xmlHttp.readyState == 1) {
		myDiv.innerHTML += "asdСостояние запроса: 1 (отправляется) <br/>";
	}
	else if (xmlHttp.readyState == 2) {
		myDiv.innerHTML += " Состояние запроса: 2 (отправлен) <br/>";
	}
	else if (xmlHttp.readyState == 3) {
		myDiv.innerHTML += " Состояние запроса: 3 (идет обмен) <br/>";
	}
	// когда readyState = 4, мы можем прочитать ответ сервера
	else if (xmlHttp.readyState == 4) {
		// продолжать, только если статус HTTP равен "OK"
		if (xmlHttp.status == 200) {
			try {
				// прочитать ответ сервера
				response = xmlHttp.responseText;
				// вывести сообщение
				myDiv.innerHTML +=
				"Состояние запроса: 4 (завершен). Сервер ответил: <br/>";
				myDiv.innerHTML += response;
			}
			catch (e) {
				// вывести сообщение об ошибке
				alert("Ошибка чтения ответа: " + e.toString());
			}
		}
		else {
			// вывести сообщение о состоянии
			alert("Возникли проблемы во время получения данных:\n" +
				xmlHttp.statusText);
		}
	}
}
