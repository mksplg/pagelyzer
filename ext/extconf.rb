current_path = File.expand_path(File.dirname(__FILE__))

file_names = [File.join(current_path, '../ext/ex_images.xml'), File.join(current_path, '../ext/ex_hybride.xml'), File.join(current_path, '../ext/ex_structure.xml')]

file_names.each do |file_name|
    contents = File.read(file_name)
    replaced = contents.gsub(/%EXT_DIR%/, current_path)
    File.open(file_name, "w") {|file| file.puts replaced}
end
