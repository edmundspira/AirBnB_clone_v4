$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

$(() => {
  const aObj = {};
  const search = {};
  const searchKey = 'amenities';

  $('input').prop('checked', false);
  $('input').change(() => {
    for (const idx of $('input')) {
      if (idx.checked) aObj[idx.dataset.name] = idx.dataset.id;
      else delete aObj[idx.dataset.name];
    }
    $('.amenities h4').html(Object.keys(aObj).join(', '));
    search[searchKey] = Object.values(aObj);
  });

  $('button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(search),
      success: function (data) {
        $('article').remove();
        let foo = '';

        for (const place of data) {
          foo += `<article>

          <div class="title">

            <h2>${place.name}</h2>

            <div class="price_by_night">

        ${place.price_by_night}

            </div>
          </div>
          <div class="information">
            <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

        ${place.max_guest} Guests

            </div>
            <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_rooms} Bedrooms
            </div>
            <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_bathrooms} Bathroom

            </div>
          </div>

          <!-- **********************
         USER
         **********************  -->

          <div class="user">

          </div>
          <div class="description">

            ${place.description}

          </div>

        </article>`;
        }
        $('.places h1').after(foo);
      }
    });
  });
});
