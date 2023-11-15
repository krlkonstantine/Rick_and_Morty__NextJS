// Импортируем необходимые зависимости из библиотек и компонентов
import React from 'react';
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { getLayout } from "components/Layout/BaseLayout/BaseLayout";
import * as path from "path";
import * as process from "process";
import fs from "fs/promises";

// Функция getStaticProps используется для получения статических данных во время сборки
export const getStaticProps = async () => {
    // Внутренняя функция для асинхронного чтения данных из файла
    const getParsedData = async (): Promise<{ title: string }> => {
        // Формирование пути к файлу
        const filePath = path.join(process.cwd(), 'public', 'staticData.json');

        // Попытка чтения и парсинга данных из файла
        try {
            const jsonData = await fs.readFile(filePath);
            return JSON.parse(jsonData.toString());
        } catch (err) {
            // В случае ошибки возвращаем объект с заглушкой
            return { title: 'no title' };
        }
    }

    // Вызываем внутреннюю функцию для получения данных
    const { title } = await getParsedData();

    // Возвращаем данные в виде props
    return {
        props: {
            title
        },
    };
}

// Определение типов для props компонента
type PropsType = {
    title: string
}

// Основной компонент TestCharacters, который выводит данные в PageWrapper
const TestCharacters = (props: PropsType) => {
    const { title } = props;

    return (
        <PageWrapper>
            {title}
        </PageWrapper>
    );
};

// Присваиваем функцию getLayout в TestCharacters для настройки макета
TestCharacters.getLayout = getLayout;

// Экспортируем компонент TestCharacters
export default TestCharacters;
