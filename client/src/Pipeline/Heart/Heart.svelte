<!-- https://fontawesome.com/icons/heart?style=solid -->
<div class="container">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <title>Heart</title>
    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
  </svg>
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="heart-pulse" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
  </svg>
</div>

<style>
  .container {
    position: relative;
  }

  .heart {
    height: 100%;
    color: #cf67a0;
  }

  .heart-pulse {
    height: 100%;
    color: #cf67a0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    opacity: 1;
    transform: scale(1);
    animation: pulse 5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }

    70% {
      transform: scale(1.25);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>