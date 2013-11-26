Gem::Specification.new do |s|
	s.name        = 'pagelyzer'
	s.version     = '0.1.0'
	s.summary     = "Detect changes in web pages"
	s.description = "Suite of tools for detecting changes in web pages and their rendering"
	s.authors     = ["Andrés Sanoja", "Alexis Lechervy", "Zeynep Pehlivan", "Myriam Ben Saad", "Marc Law", "Carlos Sureda", "Jordi Creus"]
	s.email       = ['andres.sanoja@lip6.fr', 'alexis.lechervy@lip6.fr', 'zeynep.pehlivan@lip6.fr', 'myriam.ben-saad@lip6.fr', 'marc.law@lip6.fr', 'carlos.sureda@lip6.fr', 'jordi.creus@lip6.fr']
	s.files       = Dir['bin/*'] + Dir['lib/**/*'] + Dir['data/js/*'] + Dir['pagelyzer'] + Dir['ext/**/*']
	s.homepage    = 'https://github.com/openplanets/pagelyzer'
	s.license      = 'Apache-2.0'
	s.executables << 'pagelyzer'
	s.bindir	= '.'
	s.extensions  = ['ext/extconf.rb']
	s.add_runtime_dependency 'nokogiri'  
	s.add_runtime_dependency 'sanitize' 
        s.add_runtime_dependency 'selenium-webdriver'
        s.add_runtime_dependency 'headless'
        s.add_runtime_dependency 'rjb'
        s.add_runtime_dependency 'mini_magick'
end

