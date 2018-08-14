var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    cleancss = require('gulp-clean-css'),
    notify = require("gulp-notify"),
    cache = require('gulp-cached'),
    rigger = require('gulp-rigger'),
    reload = browserSync.reload,
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    babel = require('gulp-babel');

  var path = {
    build: {
      html: 'build',
      js: 'build/js',
      css: 'build/css',
    },
    src: {
      html: 'src/**/*.jade',
      js: 'src/js/main.js',
      style: 'src/style/main.scss',
    },
    watch: {
      html: 'src/**/*.jade',
      js: 'src/js/**/*.js',
      style: 'src/style/**/*.scss'
    }
  };

  var config = {
    server: {
      baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 7777,
    logPrefix: "Building::",
    notify: false,
  };
  
  function formatUrl(path) { 
    var locale = 'en-us'
    return '/' + locale + '/' + path 
  }

  // #{locals.true_image_imaging}

  var urls = {
    //features top
    'true_image_imaging': formatUrl('personal/true-image-features/imaging/'),
    'ransomware_protection': formatUrl('ransomware-protection/'),
    'blockchain_data_authentication': formatUrl('blockchain-data-authentication/'),

    //awards
    'awards': formatUrl('company/awards/'),

    //help left
    'resource_17': formatUrl('resource-center/resource/17/'),
    //help right
    'knowledge_base_true_image': 'https://kb.acronis.com/acronis-true-image-2018/',
    'video_tutorials_true_image': formatUrl('tutorials/ATI2017/'),
    'documentation': formatUrl('support/documentation/'),
    'forum_true_image': 'https://forum.acronis.com/forum/acronis-true-image-discussions/acronis-true-image-2018-forum/',
    //help right bottom
    'support_true_image': formatUrl('support/trueimage/2018/'),
    'support': 'https://support.acronis.com/',

    //articles
    'article_how_to_back_up_iphone': formatUrl('articles/how-to-back-up-iphone/'),
    'article_cloning_software': formatUrl('articles/cloning-software/'),
    'article_imaging_software': formatUrl('articles/imaging-software/'),
    'article_how_to_backup': formatUrl('articles/how-to-backup/'),
    'articles': formatUrl('articles/'),

    //relevant
    'revive': formatUrl('personal/how-to-recover-files/'),
    'free_data_protection': formatUrl('personal/free-data-protection/'),
    'vss': formatUrl('personal/vss-diagnostic-free-tool/'),

    // footer
    'company': formatUrl('company/'),
    'contact': formatUrl('company/#contacts'),
    
    'blog': formatUrl('blog/'),
    'management': formatUrl('company/#management'),
    'press': formatUrl('company/#press-center'),
    'careers': formatUrl('careers/'),

    'private_browsing': formatUrl('personal/private-browsing/'),
    'cloud_backup': formatUrl('cloud/backup/'),
    'gdpr': formatUrl('articles/gdpr/'),
    'cloning_software': formatUrl('articles/cloning-software/'),
    'data_recovery': formatUrl('lp/business/data-recovery/'),

    'special_projects': formatUrl(''),
    'chronicles': formatUrl('company/acronis-chronicles/'),
    'motorsport': 'https://motorsport.acronis.com/',

    'support_2': formatUrl('support/'),
    'support_updates': formatUrl('support/updates/'),
    'kb': 'https://kb.acronis.com/',
    'documentation': formatUrl('support/documentation/'),
    'support_contact': formatUrl('support/contact-us/'),
    'affiliate': 'http://affiliate.acronis.com/',

    'acronis_legal': formatUrl('legal.html'),

    //social
    'facebook': 'https://www.facebook.com/acronis/',
    'twitter': 'https://www.twitter.com/acronis/',
    'youtube': 'https://www.youtube.com/Acronis/',
    'linkedin': 'https://www.linkedin.com/company/acronis/',




    //header

    'main_page': formatUrl(''),
    'resources' : formatUrl('resource-center/'),
    'renewals': formatUrl('business/renewals/'),
    'account': 'https://account.acronis.com/',

    'acronis_true_image_2018': formatUrl('z/personal/computer-backup/'),
    'acronis_true_image_2018_buy': formatUrl('z/personal/computer-backup/#buy'),
    'acronis_true_image_2018_buy_page': formatUrl('z/personal/buy-backup/'),
    'acronis_true_image_2018_try': formatUrl('z/personal/computer-backup/#try'),
  

    'acronis_disk_director_12': formatUrl('personal/disk-manager/'),
    'acronis_disk_director_advanced': formatUrl('business/enterprise-solutions/server-partition-management/'),
    'acronis_revive_2018': formatUrl('personal/how-to-recover-files/'),
    'acronis_ransomware_protection': formatUrl('free-data-protection/'),
    'acronis_vss_doctor': formatUrl('personal/vss-diagnostic-free-tool/'),

    'acronis_backup_12_5': formatUrl('business/backup/'),
    'acronis_backup_try': formatUrl('business/backup/trial/'),
    'acronis_disaser_recovery_addon': formatUrl('service-provider/disaster-recovery/'),
    'acronis_cloud_storage_addon': formatUrl('cloud/storage/'),

    'acronis_windows_server': formatUrl('business/backup/windows-server/'),
    'acronis_windows_server_essentials': formatUrl('business/backup/server-essentials/'),
    'acronis_linux': formatUrl('business/backup/linux-server/'),

    'acronis_vmware': formatUrl('business/backup/virtual-machine/'),
    'acronis_microsoft_hyper_v': formatUrl('business/backup/hyper-v/'),
    'acronis_citrix_xenServer': formatUrl('/business/backup/xen/'),
    'acronis_rhev': formatUrl('business/backup/rhv/'),
    'acronis_linux_kvm': formatUrl('business/backup/kvm/'),
    'acronis_oracle_vm_server': formatUrl('business/backup/oracle-vm/'),

    'acronis_oracle_database': formatUrl('business/backup/oracle/'),
    'acronis_exchange': formatUrl('business/backup/microsoft-exchange/'),
    'acronis_sql_server': formatUrl('business/backup/sql/'),
    'acronis_sharepoint': formatUrl('business/backup/microsoft-sharepoint/'),
    'acronis_active_directory': formatUrl('business/backup/active-directory/'),

    'acronis_iphone_ipad': formatUrl('business/backup/iphone-ipad-android/'),
    'acronis_android': formatUrl('business/backup/iphone-ipad-android/'),

    'acronis_windows': formatUrl('business/backup/workstation/'),
    'acronis_pc': formatUrl('business/backup/workstation/'),
    'acronis_mac': formatUrl('business/backup/mac/'),

    'acronis_office_365': formatUrl('business/backup/office-365/'),
    'acronis_azure': formatUrl('business/backup/cloud-vm/'),
    'acronis_amazon_ec2': formatUrl('business/backup/cloud-vm/'),

    'acronis_more_products': formatUrl('business/overview/'),

    'acronis_storage': formatUrl('business/software-storage/'),
    'acronis_disaster_recovery_service': formatUrl('business/disaster-recovery-service/'),
    'acronis_access_connect': formatUrl('mobility/mac-windows-compatibility/'),

    'acronis_access_advanced': formatUrl('mobility/access-advanced/'),
    'acronis_snap_deploy': formatUrl('business/enterprise-solutions/image-deployment/'),
    'acronis_monitoring_service': formatUrl('business/monitoring-service/'),

    'acronis_mass_transit': formatUrl('mobility/managed-file-transfer/'),
    'acronis_archive_connect': formatUrl('mobility/mac-archiving-system/'),

    'acronis_data_protection_solutions': formatUrl('business/enterprise-solutions/'),

    'acronis_small_businesses': formatUrl('business/enterprise-solutions/small-business/'),
    'acronis_medium_sized_businesses': formatUrl('business/enterprise-solutions/mid-size-business/'),
    'acronis_enterprise': formatUrl('business/enterprise-solutions/enterprise/'),
    'acronis_professional_services_business': formatUrl('business/enterprise-solutions/professional-services/'),

    'acronis_education_research': formatUrl('business/enterprise-solutions/acronis-for-education-research/'),
    'acronis_public_sector': formatUrl('business/enterprise-solutions/government-education/'),
    'acronis_service_providers': formatUrl('cloud/service-provider/'),

    'acronis_microsoft_environments': formatUrl('business/enterprise-solutions/microsoft/'),

    'acronis_data_cloud': formatUrl('cloud/service-provider/platform/'),
    'acronis_data_cloud_try': formatUrl('cloud/service-provider/platform/?trial='),

    'acronis_backup_cloud': formatUrl('cloud/service-provider/backup/'),
    'acronis_disaster_recovery_cloud': formatUrl('cloud/service-provider/disaster-recovery/'),
    'acronis_files_cloud': formatUrl('cloud/service-provider/files/'),

    'acronis_backup_advanced_for_vCloud': formatUrl('cloud/service-provider/vcloud/'),
    'acronis_professional_services': formatUrl('business/enterprise-solutions/professional-services/#service-providers'),
    'acronis_spla_program': formatUrl('cloud/service-provider/licensing/'),

    'acronis_partner_programs': formatUrl('partners/'),

    'acronis_service_provider_program': formatUrl('partners/service-providers/'),
    'acronis_reseller_program': formatUrl('partners/resellers/'),
    'acronis_oem_program': formatUrl('partners/oem/'),
    'acronis_affiliates_program': 'http://affiliate.acronis.com/',

    'acronis_partner_portal': 'https://partners.acronis.com/profile/login.html',
    'acronis_partner_locator': formatUrl('partners/locator/'),
    'acronis_distributor_locator': formatUrl('partners/distributor-locator/'),
    
    'acronis_documentation': formatUrl('support/documentation/'),
    'acronis_product_updates': formatUrl('support/updates/index.html'),
    'acronis_product_support_lifecycle': formatUrl('support/lifecycle/'),
    'acronis_video_tutorials': formatUrl('tutorials/'),
    'acronis_knowledge_base': 'https://kb.acronis.com/',
    'acronis_user_forums': 'https://forum.acronis.com/',
    'acronis_contact_support': formatUrl('support/'),
    'acronis_maintenance_renewals': formatUrl('business/renewals/'),
    'acronis_submit_feedback': formatUrl('support/feedback.html'),

    
    'acronis_true_image_ios': 'https://itunes.apple.com/app/id978342143/',
    'acronis_true_image_android': 'https://play.google.com/store/apps/details?id=com.acronis.acronistrueimage',


    //split page article links
    'acronis_how_to_back_up_an_iphone': formatUrl('articles/how-to-back-up-iphone/'),
    'acronis_hard_drive_cloning': formatUrl('articles/cloning-software/'),
    'acronis_how_to_back_up_android_devices': formatUrl('articles/android-backup/'),
    'acronis_how_to_backup_computer_android_or_iphone': formatUrl('articles/how-to-backup/'),
    'acronis_how_to_easily_recover_lost_or_deleted_partitions': formatUrl('articles/partition-recovery/'),
    'acronis_how_to_back_up_a_hard_drive_and_restore_your_computer': formatUrl('articles/backup-hard-drive/'),

    'acronis_automotive': formatUrl('lp/business/backup/automotive'),

    'acronis_foundation': 'https://foundation.acronis.com',

    'acronis_15': 'https://15.acronis.com',

    'acronis_15_main': 'https://15.acronis.com',
    'acronis_15_year': 'https://15.acronis.com/#history/',
    'acronis_15_feedback': 'https://15.acronis.com/#feedback',
    'acronis_15_greetings': 'https://15.acronis.com/#greetings',

    
    // 'acronis_15_main': 'https://andieelmes.ru/test/acronis-15',
    // 'acronis_15_year': 'https://andieelmes.ru/test/acronis-15/#history/',
    // 'acronis_15_feedback': 'https://andieelmes.ru/test/acronis-15/#feedback',
    // 'acronis_15_greetings': 'https://andieelmes.ru/test/acronis-15/#greetings',
    
  }

  gulp.task('html:build', function () {
    var YOUR_LOCALS = {};
    gulp.src(path.src.html)
      .pipe(cache('jading...'))
      .pipe(jade({locals: urls, pretty: true}))
      .on('error', notify.onError(function (err) {
        return {
          title: 'Jade',
          message: err.message
        };
      }))
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
  });

  gulp.task('js:build', function () {
    browserify('src/js/main.js')
      .transform(babelify.configure({
        plugins: ["transform-runtime"],
        presets : [
          "es2015",
          "stage-3",
          "stage-2",
          "stage-1"
        ]
      }))
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('build/js/'))
      .pipe(reload({stream: true}))
  });


  gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            browsers: ['last 4 versions','> 1%','Android 4.4','ios_saf >=7']
        }))
        .pipe(gulpif(argv.prod, cleancss()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
  });

  gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
  ]);

  gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
      gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
      gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
      gulp.start('js:build');
    });

  });

  gulp.task('webserver', function () {
    browserSync(config);
  });

  gulp.task('default', ['build', 'webserver', 'watch']);
