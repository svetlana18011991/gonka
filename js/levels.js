const LEVELS = {
    easy: {
        name: '🟢 Легкий',
        speed: 3,
        spawnInterval: 120,    // каждые 120 фреймов
        laneCount: 3,
        forcedCollisionTime: 20000,  // через 20 секунд
        questionTime: 30,
        obstacleTypes: ['car', 'cone'],
        carColors: ['#ffcc00', '#ff8800'],
    },
    medium: {
        name: '🟡 Средний',
        speed: 5,
        spawnInterval: 80,
        laneCount: 3,
        forcedCollisionTime: 12000,
        questionTime: 20,
        obstacleTypes: ['car', 'cone', 'barrier'],
        carColors: ['#ff8800', '#ff4400'],
    },
    hard: {
        name: '🔴 Сложный',
        speed: 8,
        spawnInterval: 50,
        laneCount: 3,
        forcedCollisionTime: 8000,
        questionTime: 10,
        obstacleTypes: ['car', 'cone', 'barrier', 'truck'],
        carColors: ['#ff4400', '#ff0000'],
    }
};
