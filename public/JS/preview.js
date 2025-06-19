document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('input[name="nombre"]').addEventListener('input', function() {
        document.getElementById('preview-nombre').textContent = this.value || 'N/A';
    });

    document.querySelector('input[name="precio"]').addEventListener('input', function() {
        const valor = parseFloat(this.value);
        document.getElementById('preview-precio').textContent = !isNaN(valor) ? `${valor.toFixed(0)}$` : '$';
    });

    document.querySelector('input[name="kilocalorias"]').addEventListener('input', function() {
        document.getElementById('preview-kcal').textContent = this.value || '0';
    });

    document.querySelector('input[name="proteinas"]').addEventListener('input', function() {
        document.getElementById('preview-proteinas').textContent = this.value ? `${this.value}g` : '0g';
    });

    document.querySelector('input[name="carbohidratos"]').addEventListener('input', function() {
        document.getElementById('preview-carbohidratos').textContent = this.value ? `${this.value}g` : '0g';
    });

    document.querySelector('input[name="grasas"]').addEventListener('input', function() {
        document.getElementById('preview-grasas').textContent = this.value ? `${this.value}g` : '0g';
    });

    document.getElementById('input-imagen').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview-img-final').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});
