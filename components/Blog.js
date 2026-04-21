const Blog = {
    data: [],

    setData(blogData) {
        this.data = blogData;
    },

    render() {
        if (!this.data.length) return '<div></div>';

        const html = this.data.map(post => `
            <div class="blog-card" data-id="${post.id}">
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="blog-card-image" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E📖%3C/text%3E%3C/svg%3E'">
                <div class="blog-card-content">
                    <span class="blog-card-tag">${post.category}</span>
                    <h3 class="blog-card-title">${this.escapeHtml(post.title)}</h3>
                    <p class="blog-card-description">${this.escapeHtml(post.description.substring(0, 100))}${post.description.length > 100 ? '...' : ''}</p>
                    <a href="blog/blog-post.html?id=${post.id}" class="blog-card-link">Читать далее →</a>
                </div>
            </div>
        `).join('');

        return `
            <section id="blog" class="blog-section">
                <div class="container">
                    <div class="blog-header">
                        <span class="blog-tag">Полезное</span>
                        <h2 class="blog-title">Блог</h2>
                        <div class="blog-divider"></div>
                        <p class="blog-subtitle">Статьи о керамике, сухоцветах и интерьере</p>
                    </div>
                    
                    <div class="blog-slider-container">
                        <button class="blog-slider-btn blog-slider-left" id="blogScrollLeftBtn">‹</button>
                        <button class="blog-slider-btn blog-slider-right" id="blogScrollRightBtn">›</button>
                        <div class="blog-slider" id="blogSlider">
                            ${html}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function (m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    },

    bindEvents() {
        const scrollContainer = document.getElementById('blogSlider');
        const leftBtn = document.getElementById('blogScrollLeftBtn');
        const rightBtn = document.getElementById('blogScrollRightBtn');

        if (leftBtn && scrollContainer) {
            leftBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: -340, behavior: 'smooth' });
            });
        }

        if (rightBtn && scrollContainer) {
            rightBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: 340, behavior: 'smooth' });
            });
        }
    }
};