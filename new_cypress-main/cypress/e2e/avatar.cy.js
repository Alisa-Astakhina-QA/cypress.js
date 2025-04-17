import * as data from "../helpers/default_data.json"

describe('Проверка покупки нового аватара', function () { // Название набора тестов

    it('Покупка нового аватара для тренера', function () { // Название теста
       cy.visit('https://pokemonbattle.ru/'); // Переходим на сайт https://pokemonbattle.ru/
       cy.get('input[id="k_email"]').type(data.user_login); // Вводим логин
       cy.get('input[id="k_password"]').type(data.user_password); // Вводим пароль
       cy.get('button[type="submit"]').click(); // Нажимаем кнопку Подтвердить
       cy.wait(2000); // Ждем 2 секунды
       cy.get('.header_card_trainer').click(); // Клик в шапке на аву тренера
       cy.wait(2000); // Ждем 2 секунды
       cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // Нажимаем кнопку Смена аватара
       cy.get('.available > button').first().click(); // Кликаем Купить у первого доступного аватара
       cy.get('.card_number').type(data.card); // Вводим номер карты
       cy.get('.card_csv').type('125'); // Вводим CVV карты
       cy.get('.card_date').type('1226'); // Вводим срок действия карты
       cy.get('.card_name').type(data.name); // Вводим имя владельца действия карты
       cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажимаем кнопку Оплатить
       cy.get('.threeds_number').type('56456'); // Вводим код подтверждения СМС
       cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажимаем кнопку Оплатить
       cy.contains('Покупка прошла успешно').should('be.visible'); // Проверяем наличие и видимость сообщения об успешной покупке
   });
})