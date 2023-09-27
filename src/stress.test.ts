import http from 'k6/http';
import { sleep } from 'k6';
import env from 'endpoints.config';


export default function (){
    const serverUrl = env.serverUrl || 'http://localhost:8080';
    let response = http.get(serverUrl);
    if (response.status === 200) {
        console.log('Запрос успешен');
      } else {
        console.log(`Ошибка: HTTP ${response.status}`);
      }
    
      // Добавляем паузу перед следующим запросом (например, 1 секунда)
    sleep(1);
}