import ParisCup from "../_components/parisCup/parisCup";
import Collections from "../_components/collections/MainPageGrid";
import About from "../_components/about/about";
import Description from "../_components/description/NewsBlock";
import MainPageCss from "../mainPage/mainPage.css";
import DesignLine from "../_components/designLine/DesignLine.js";

const aboutText = {
  title: "О НАС",
  description: `С 2014 года наша компания предоставляет решения для метрологической отрасли, обеспечивая точность и надежность измерений для более чем 8,000 компаний по всей стране. Мы специализируемся на предоставлении высококачественных услуг в области калибровки, сертификации и тестирования приборов и оборудования для различных отраслей, включая промышленность, медицину и энергетику.\n
Наши профессиональные услуги и экспертиза сделали нас лидерами в области метрологии. Мы используем только высококачественные стандарты и оборудование для выполнения точных измерений и сертификаций, что позволяет нашим клиентам получать надежные данные для оптимизации своих процессов и обеспечения безопасности.\n
Наша цель — предложить решения, которые помогут нашим клиентам соблюдать требования к точности измерений и обеспечить максимальную эффективность их работы. Мы предоставляем полный спектр услуг, включая калибровку оборудования, сертификацию приборов и консалтинг по вопросам метрологии.`,
  moreInfo: `Наша компания предлагает широкий спектр услуг, включая калибровку, тестирование и сертификацию оборудования для самых разных нужд. Мы специализируемся на точных измерениях, обеспечивая высокий уровень точности для таких приборов, как измерители температуры, давления, массы и другие высокоточные устройства. Наши услуги идеально подходят для предприятий, работающих в различных секторах: промышленность, наука, здравоохранение, энергетика, транспорт.\n
Мы обеспечиваем не только высокое качество услуг, но и гибкость в подходе к каждому клиенту. Мы предоставляем персонализированные пакеты услуг, которые соответствуют специфике работы и требованиям наших клиентов. Независимо от того, нужна ли вам калибровка для лаборатории или сертификация для промышленного предприятия, мы всегда предложим наилучшее решение.\n
Мы понимаем, насколько важна точность в нашей отрасли, и поэтому уделяем внимание каждому шагу процесса. Наша команда профессионалов с многолетним опытом и использованием новейших технологий гарантирует надежность наших услуг. Мы работаем с высококачественным оборудованием и сертифицированными методами, чтобы гарантировать точность и соответствие стандартам.\n
Мы также предлагаем онлайн-сервис для удобного размещения заказов, что позволяет нашим клиентам быстро и легко заказать необходимые услуги. С нами ваш бизнес всегда будет уверен в точности и надежности измерений.`,
};


const Main = () => {
  return (
    <div className="main-container">
      <div className="paris-cup-container">
        <ParisCup />
      </div>
      <DesignLine/>
      <div className="collections-container">
        <Collections />
      </div>
      <div className="description-container">
        <Description />
      </div>
      <div className="about-container">
        <About
          title={aboutText.title}
          description={aboutText.description}
          moreInfo={aboutText.moreInfo}
        />
      </div>

    </div>
  );
};

export default Main;
