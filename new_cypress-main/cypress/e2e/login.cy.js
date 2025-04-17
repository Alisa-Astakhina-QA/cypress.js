import * as data from "../helpers/default_data.json"


describe('Проверка авторизации', function () { // Название набора тестов

    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio/'); // Зашла на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль 
    });

    afterEach('Конец теста', function () {
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
    });
          
    it('Верный логин и верный пароль', function () { // Название теста
         cy.get('#mail').type(data.login); // Ввела верный логин
         cy.get('#pass').type(data.password); // Ввела верный пароль
         cy.get('#loginButton').click(); // Нажала войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст  
    })

     it('Проверка логики восстановления пароля', function () { // Название теста
        cy.get('#forgotEmailButton').click(); // Нажимаю восстановить пароль
        cy.get('#mailForgot').type(data.login); // Ввела верный логин (почту) для восстановления
        cy.get('#restoreEmailButton').click(); // Нажала отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текста
    })

    it('Верный логин и НЕверный пароль', function () { // Название теста
        cy.get('#mail').type(data.login); // Ввела верный логин
        cy.get('#pass').type('iLoveqastudio'); // Ввела НЕверный пароль
        cy.get('#loginButton').click(); // Нажала войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('НЕверный логин и верный пароль', function () { // Название теста
        cy.get('#mail').type('german1@dolnikov.ru'); // Ввела НЕверный логин
        cy.get('#pass').type(data.password); // Ввела верный пароль
        cy.get('#loginButton').click(); // Нажала войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('Если в логине нет @, то получаем ошибку валидации', function () { // Название теста
        cy.get('#mail').type('germandolnikov.ru'); // Ввела логин без @ 
        cy.get('#pass').type(data.password); // Ввела верный пароль
        cy.get('#loginButton').click(); // Нажала войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('Проверка на приведение к строчным буквам в логине', function () { // Название теста
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввела логин с заглавными буквами
        cy.get('#pass').type(data.password); // Ввела верный пароль
        cy.get('#loginButton').click(); // Нажала войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
    })
})