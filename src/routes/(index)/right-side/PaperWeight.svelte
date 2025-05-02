<div class="paperWeight"></div>

<style scoped>
.paperWeight {
    width: 6rem;
    height: 6rem;
    background-color: rgb(0 0 0 / 79%);
    box-shadow: inset 10px 10px 10px 10px rgba(8, 7, 7, 0.342),
      inset 20px 20px 20px 20px rgba(8, 7, 7, 0.1),
      10px 10px 20px rgba(0, 0, 0, 0.425),
      inset -10px -10px 10px 10px rgba(41, 40, 40, 0.568),
      inset -20px -20px 20px 20px rgba(41, 40, 40, 0.568);
    border-radius: 51% 49% 62% 38% / 25% 57% 43% 75%;
    position: absolute;
    top: 1.4rem;
    right: 1rem;
    transform: rotate(170);
    z-index: 100;
  }
  
  .paperWeight::after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.329);
    box-shadow: 0 0 50px rgb(226, 226, 226);
    border-radius: 80% 20% 91% 9% / 48% 67% 33% 52%;
    top: 50px;
    left: 40px;
  }
  
  .paperWeight::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.315);
    box-shadow: 0 0 50px rgb(255, 255, 255);
    border-radius: 48% 52% 45% 55% / 48% 67% 33% 52%;
    top: 40px;
    left: 60px;
  }
</style>