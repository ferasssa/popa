//Окно игры
var cvs = document.getElementById("canvas");//Перетаскиваем Canvas из html в JS и getElementById присваемает к id='canvas' переменную cvs
var ctx = cvs.getContext("2d");// Указываем что canvas в 2D

//Объекты ориентации в пространстве
var bird = new Image();//Объект птица это изображение (которое скоро мы импортируем)
var bg = new Image();//Задний фон это изображение
var fg = new Image();//Передний фон это изображение
var pipeUp = new Image();//Верхнии препядствия это изображения
var pipeBottom = new Image();//нижнии препядствия это изображения

//Импорт файлов
bird.src = "flappy_bird_bird.png";//Импортируем изображение с птицой
bg.src = "bg.png";//Импортируем изображение заднего фона
fg.src = "fg.png";//Импортируем изображение переднего фона
pipeUp.src = "pipeUp.png";//Импортируем изображение с верхними препядствиями
pipeBottom.src = "pipeBottom.png";//Импортируем изображение с нижними препядствиями

// Звуковые файлы
var fly = new Audio();//Звук прыжка находится под значением fly
var score_audio = new Audio();//Звук каждого успешно пройденного препядствия находится под значением score

fly.src = "fly.mp3";//Импортируем звук в в звуковой объект fly (src это метод для присваивания объектам (звукового или нет) файлы или файл)
score_audio.src = "score.mp3";//Импортируем звук в в звуковой объект score

var gap = 120;//Это расстояние между двумя препядствиями (верхним и нижним). Что-бы пица могла пролетать не задивая блоки препядствий


// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);//Если пользователь нажмет на кнопку (document.addEventListener = document - это текст, addEventListener - он отслеживает клавиатуру на какое-либо действие) на какую-нибудь кнопку (за получение положительного сигнала в метод addEventListener (путем нажатия клавиши) отвечает тег "keydown") и после вызывается функция moveUp
function moveUp() {//Создаем функцию moveUp
	yPos -= 35;//При положительно сигнале от document.addEventListener("keydown"… наша птица будет опускаться на 35 пикселе (yPos -= 35)
	fly.play();//И одновременно с перемешением издавать звук fly.mp3
}//

// Создание блоков
var pipe = [];//Создаем пустой, ПОКА ПУСТОЙ!!! массив (pipe)

pipe[0] = {//создаем один объект в массиве, поэтому указываем что он нулевой(то есть первый но в JS первый является нулевым)
	x : cvs.width,//это объект который прозрачен и расположен на всю ширену окна игры и он статичен в плане высоты, короче это линия прозрачная без высоты но распложенная на всю ширену по которой в цикле for (i) будут передвигатьсяпредпядствия и верхние и нижнее
	y : 0//нулевое положение в  высоте или статичное в плане что его нет
}//

var score = 0;
// Позиция птички
var xPos = 10;//Позиция птрицы по x
var yPos = 150;//Позиция птрицы по y
var grav = 2;//Скорость с которой птичка опускается по y (игрику) вниз

function draw() { //Создаем функцию draw
	ctx.drawImage(bg, 0, 0);//которая в нашем canvas2D(ctx) рисуем с помошью метода drawImage задний фон (bg) нв координатах 0, 0

	for(var i = 0; i < pipe.length; i++) {//в этом цикле мы будем генерировать премятствия для птички
	ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);//Мы отображаем верхнее препядствие (pipeUp) с помошью метода drawImage

	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +//Мы отображаем нижнее препядствие (pipeBottom) с помошью метода drawImage,
	pipeUp.height + gap);//но генерация нижнего блока будет принижена на 90 пикселей из-за pipeUp.height + gap (pipeUp - это верхнее препядствие, pipeUp.height - это высота всего верхнего блока, gap - это отступ между верхним и нижним препядствием) и их сложение дает этот отступ

	pipe[i].x--;//Заставляем блоки ,то есть кажда блок потому что в квадратных скобкаж объявлен цикл который перебирает все объекты в нем изи за метода в цикле pipe.length(pipe[i]) по x(иксу)двигаться вперед на 1(x--)

//Гинерация случайных отверстий в последующих препядствиях
	if(pipe[i].x == 125) {//если он начало изночальной позиции линия передвинулать на 125 пикселей то
	pipe.push({//появляются в массиве pipe нове объекты(объекты, мотому что после pipe.push и открытия скобки мы открыли еще и фигурную скобку)
	x : cvs.width,// объект препядствия (верхнего и нижнего ПРОСТО ОНИ УЖЕ ОБЪЕДИНЕНЫ ВМЕСТЕ в цикле for) будут появлятся за экраном. cvs.width вытесняет их за экран, потому что дальше чем ширина самого окна не видно (это охоже на метод в html -hidden-)
	y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height//и дыры появляюшиеся в объекте верхнего и нижниего препядстий можно генерировать подбором случайной высоты ,то есть Math.floor(Math.random() * pipeUp.height)(Math.floor - это округление до целого чила, Math.random() - это рандомизация случайного числа и округление до целого предыдущем методом floor) и вычитаем из этого всего - pipeUp.height для того, чтобы отверсте в препядствиях держалость в приделах экрана где мы хоть что-то видем
	});
	}

// Отслеживание прикосновений
	if(xPos + bird.width >= pipe[i].x
	&& xPos <= pipe[i].x + pipeUp.width
	&& (yPos <= pipe[i].y + pipeUp.height
	|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
	|| yPos + bird.height >= cvs.height - fg.height) {//При задевании переднего фона
	location.reload(); // Перезагрузка страницы
	}
//Счет очков
	if(pipe[i].x == 5) {//если препядствие начинает выходить с левой стороны экрана значит прица прошла и…
	score++;//Наш счет будет увеличиваться на один при каждом успешном пролёте через отверстие
	score_audio.play();//И в это же время будет проигрываться score.mp3
	}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);//Мы отображаем пережний фон (fg) с помошью метода drawImage, но он генерируесть в положении  0, cvs.height - fg.height (x = 0, y = cvs.height - fg.height) cvs - значит мы оброшаемся к всему дисплею, cvs.height - это высота всего экрана с игрой из которой мы вычитаем высоту заднего фона (- fg.height)

	ctx.drawImage(bird, xPos, yPos);//Мы отображаем птичку там где она появится после загрузки игры(bird) с помошью метода drawImage. А самое главное, что xPos, yPos равны 10 и 150 (55 строчка)


	yPos += grav;//Эта строка активируест 102 строку так как изночатьно yPos = 150 то grav непонятно как но понижает до нуля постопенно и медленно со скоростью 2
//Надписб с очками
	ctx.fillStyle = "#000";//Цвет текста
	ctx.font = "24px Arial";//Шрифт текста
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);//ctx.fillText - для установки текта на экране (экран = ctx) 10, cvs.height расположение на экране

	requestAnimationFrame(draw);//Это метод постоянной анимации вниз в функции draw. Метод в этой фунции, потому что функция работает всегда и постоянно
}

pipeBottom.onload = draw;//Если все изображения загружены (в моем случае pipeBottom является последним загруженным файлом и если он загрузица значит загрузились и все остальные файлы) то мы вызываем функцию draw (59 строка) которая начинаем отображать задний фон. Поэтому если все изображения не загруженны поиграть вы не сможете