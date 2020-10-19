function generateShoppingItem(item) {
  return `<li>
  <span class="shopping-item">${item}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
}

function handleShoppingItemAdd(evt) {
  evt.preventDefault();
  const listItem = $('#shopping-list-entry').val();
  $('#shopping-list-entry').val('');
  $('.shopping-list').append(generateShoppingItem(listItem));
}

function handleShoppingItemToggle(evt) {
  $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
}

function handleShoppingItemRemove(evt) {
  $(this).closest('li').remove();
}

$(function(){
    $('#js-shopping-list-form').submit(handleShoppingItemAdd);

    $('#shopping-list-entry').val('');
  
    $('.shopping-list').on('click', '.shopping-item-delete', handleShoppingItemRemove);
  
    $('.shopping-list').on('click', '.shopping-item-toggle', handleShoppingItemToggle);
  
  });