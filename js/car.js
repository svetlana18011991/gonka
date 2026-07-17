class PlayerCar {
    constructor(canvasWidth, canvasHeight, carIndex) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Полосы: левая, центр, правая
        this.lanes = [
            canvasWidth * 0.22,
            canvasWidth * 0.50,
            canvasWidth * 0.78
        ];
        this.currentLane = 1; // Стартуем по центру
        this.targetX = this.lanes[1];
        this.x = this.lanes[1];
        this.y = canvasHeight - 150;

        this.width = 40;
        this.height = 70;

        // Внешний вид
        this.colors = [
            { body: '#ff3333', window: '#88ccff', wheel: '#222' },
            { body: '#3388ff', window: '#aaddff', wheel: '#222' },
            { body: '#ffcc00', window: '#ffffaa', wheel: '#222' }
        ];
        this.color = this.colors[carIndex] || this.colors[0];

        // Анимация движения
        this.moveSpeed = 0.2; // скорость перехода между полосами
        this.isMoving = false;

        // Неуязвимость после столкновения
        this.invincible = false;
        this.invincibleTimer = 0;
        this.blinkTimer = 0;
    }

    moveLeft() {
        if (this.currentLane > 0 && !this.isMoving) {
            this.currentLane--;
            this.targetX = this.lanes[this.currentLane];
            this.isMoving = true;
        }
    }

    moveRight() {
        if (this.currentLane < this.lanes.length - 1 && !this.isMoving) {
            this.currentLane++;
            this.targetX = this.lanes[this.currentLane];
            this.isMoving = true;
        }
    }

    update() {
        // Плавное движение к целевой полосе
        const diff = this.targetX - this.x;
        if (Math.abs(diff) < 2) {
            this.x = this.targetX;
            this.isMoving = false;
        } else {
            this.x += diff * 0.15;
        }

        // Таймер неуязвимости
        if (this.invincible) {
            this.invincibleTimer--;
            this.blinkTimer++;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }

    setInvincible(frames = 120) {
        this.invincible = true;
        this.invincibleTimer = frames;
        this.blinkTimer = 0;
    }

    // Хитбокс — чуть меньше спрайта для честности
    getHitbox() {
        return {
            x: this.x - this.width / 2 + 6,
            y: this.y - this.height / 2 + 5,
            w: this.width - 12,
            h: this.height - 10
        };
    }

    draw(ctx) {
        // Мигание при неуязвимости
        if (this.invincible && this.blinkTimer % 8 < 4) return;

        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;

        ctx.save();

        // Тень
        ctx.shadowColor = this.color.body;
        ctx.shadowBlur = 15;

        // Корпус машины
        ctx.fillStyle = this.color.body;
        ctx.beginPath();
        ctx.roundRect(x - w/2, y - h/2, w, h, 8);
        ctx.fill();

        // Лобовое стекло (верх)
        ctx.shadowBlur = 0;
        ctx.fillStyle = this.color.window;
        ctx.fillRect(x - w/2 + 6, y - h/2 + 8, w - 12, 18);

        // Заднее стекло (низ)
        ctx.fillStyle = this.color.window;
        ctx.fillRect(x - w/2 + 6, y + h/2 - 24, w - 12, 14);

        // Фары (верх)
        ctx.fillStyle = '#ffffaa';
        ctx.beginPath();
        ctx.arc(x - w/2 + 8, y - h/2 + 4, 5, 0, Math.PI * 2);
        ctx.arc(x + w/2 - 8, y - h/2 + 4, 5, 0, Math.PI * 2);
        ctx.fill();

        // Стопы (низ) — красные
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(x - w/2 + 4, y + h/2 - 6, 8, 4);
        ctx.fillRect(x + w/2 - 12 x;
        this.y = y;
        this.type = type;
        this.speed = speed;
        this.active = true;

        // Размеры по типу
        const sizes = {
            car:     { w: 38, h: 65 },
            truck:   { w: 44, h: 90 },
            cone:    { w: 25, h: 30 },
            barrier: { w: 70, h: 25 }
        };
        const s = sizes[type] || sizes.car;
        this.width = s.w;
        this.height = s.h;

        // Цвета машин-противников
        this.enemyColors = ['#ff8844', '#8844ff', '#44ff88', '#ff4488', '#44aaff'];
        this.color = this.enemyColors[Math.floor(Math.random() * this.enemyColors.length)];
    }

    update(speed) {
        this.y += speed || this.speed;
    }

    getHitbox() {
        return {
            x: this.x - this.width / 2 + 4,
            y: this.y - this.height / 2 + 4,
            w: this.width - 8,
            
