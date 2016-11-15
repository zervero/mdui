/**
 * =============================================================================
 * ************   Slider 滑块   ************
 * =============================================================================
 */

(function () {

  /**
   * 滑块的值变更后修改滑块样式
   * @param slider
   */
  var updateValueStyle = function (slider) {
    var track = $.data(slider, 'track');
    var fill = $.data(slider, 'fill');
    var thumb = $.data(slider, 'thumb');
    var input = $.data(slider, 'input');
    var min = $.data(slider, 'min');
    var max = $.data(slider, 'max');
    var isDisabled = $.data(slider, 'disabled');
    var isDiscrete = $.data(slider, 'discrete');
    var percent = (input.value - min) / (max - min) * 100;

    if (isDisabled) {
      fill.style.width = 'calc(' + percent + '% - 6px)';
      track.style.width = 'calc(' + (100 - percent) + '% - 6px)';
    } else {
      fill.style.width = percent + '%';
      track.style.width = 100 - percent + '%';
    }

    thumb.style.left = percent + '%';

    if (isDiscrete) {
      thumb.textContent = input.value;
    }

    slider.classList[parseFloat(percent) === 0 ? 'add' : 'remove']('mdui-slider-zero');
  };

  /**
   * 重新初始化
   * @param slider
   */
  var reInit = function (slider) {
    var track = $.dom('<div class="mdui-slider-track"></div>')[0];
    var fill = $.dom('<div class="mdui-slider-fill"></div>')[0];
    var thumb = $.dom('<div class="mdui-slider-thumb"></div>')[0];

    var input = $.query('input[type="range"]', slider);
    var isDisabled = input.disabled;

    slider.classList[isDisabled ? 'add' : 'remove']('mdui-slider-disabled');

    // 重新填充 HTML
    $.remove($.query('.mdui-slider-track', slider));
    slider.appendChild(track);

    $.remove($.query('.mdui-slider-fill', slider));
    slider.appendChild(fill);

    $.remove($.query('.mdui-slider-thumb', slider));
    slider.appendChild(thumb);

    $.data(slider, {
      track: track,
      fill: fill,
      thumb: thumb,
      input: input,
      min: input.getAttribute('min'),                               // 滑块最小值
      max: input.getAttribute('max'),                               // 滑块最大值
      disabled: slider.classList.contains('mdui-slider-disabled'),  // 是否禁用状态
      discrete: slider.classList.contains('mdui-slider-discrete'),  // 是否是间续型滑块
    });

    // 设置默认值
    updateValueStyle(slider);
  };

  /**
   * 滑动滑块事件
   */
  $.on(document, 'input change', '.mdui-slider input[type="range"]', function (e) {
    console.log(e);
    var slider = $.parent(this, '.mdui-slider');
    updateValueStyle(slider);
  });

  /**
   * 开始触摸滑块事件
   */
  $.on(document, mdui.touchEvents.start, '.mdui-slider input[type="range"]', function () {
    var slider = $.parent(this, '.mdui-slider');
    slider.classList.add('mdui-slider-focus');
  });

  /**
   * 结束触摸滑块事件
   */
  $.on(document, mdui.touchEvents.end, '.mdui-slider input[type="range"]', function () {
    var slider = $.parent(this, '.mdui-slider');
    slider.classList.remove('mdui-slider-focus');
  });

  /**
   * 页面加载完后自动初始化
   */
  $.ready(function () {
    var sliders = $.queryAll('.mdui-slider');
    $.each(sliders, function (i, slider) {
      reInit(slider);
    });
  });

  /**
   * 重新初始化滑块
   */
  mdui.updateSliders = function () {
    var sliders;

    if (arguments.length === 1) {
      sliders = $.dom(arguments[0]);
    } else {
      sliders = $.queryAll('.mdui-slider');
    }

    $.each(sliders, function (i, slider) {
      reInit(slider);
    });
  };
})();
